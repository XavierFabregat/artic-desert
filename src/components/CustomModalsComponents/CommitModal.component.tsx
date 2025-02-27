import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineMail } from 'react-icons/ai';
import { FiGithub } from 'react-icons/fi';
import { ImFilesEmpty } from 'react-icons/im';
import { BiMessageSquareDetail, BiPlus, BiMinus } from 'react-icons/bi';
import { BsFillPersonLinesFill, BsFillCalendar2DateFill } from 'react-icons/bs';
import { RiCloseFill } from 'react-icons/ri';
import Backdrop from '../BackdropComponent/Backdrop.component';
import { GithubCommit } from '../../types/Types';
import { useRepo } from '../../hooks/use-repo';
import moment from 'moment';
import './CommitModal.css';
import { ApiClientService } from '../../services/ApiClientService';
import { useGhpToken } from '../../hooks/use-ghpToken';
import { useCommitModal } from '../../hooks/use-commit-modal';
import { useDispatch } from 'react-redux';
import { setCommitModal } from '../../redux/commitModal/actions';
import { CopyBlock, dracula } from 'react-code-blocks';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '-0vh',
    opacity: 1,
    transition: {
      duration: 1,
      type: 'spring',
      damping: 25,
      stiffness: 200,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: {
      duration: 1,
      type: 'spring',
      damping: 25,
      stiffness: 200,
    },
  },
};

export const CommitModal: React.FC = () => {
  const { repo } = useRepo();
  const { ghpToken } = useGhpToken();
  const { commitModal } = useCommitModal(); // has to be state that is triggered by svg click
  const [commitInfo, setCommitInfo] = useState<GithubCommit>();
  const [isFilesVisible, setIsFilesVisible] = useState(false);
  const [fileExtension, setFileExtension] = useState('');
  const [fileContents, setFileContents] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    repo &&
      ApiClientService.getCommitBySha(
        repo.owner.login,
        repo.name,
        ghpToken,
        commitModal,
      ).then(data => {
        console.log(data);
        setCommitInfo(data);
      });
  }, [commitModal]);

  const handleClose = () => {
    setFileContents('');
    setFileExtension('');
    setIsFilesVisible(false);
    dispatch(setCommitModal(''));
  }; // has to be a redux state

  const fetchContentFile = async (url: string) => {
    if (!commitInfo) return;
    const extArray = url.split('.');
    const ext = extArray[extArray.length - 1].split('?')[0];
    setFileExtension(ext);
    console.log(ext);
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GHP_TOKEN || ghpToken}`,
      },
    });
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    setFileContents(parsedResponse.content);
  };

  console.log('HI THERE, IM INSIDE COMMIT MODAL');
  return (
    commitModal &&
    commitInfo &&
    commitInfo.commit && (
      <Backdrop>
        <div className="commit-modal-wrapper">
          <motion.div
            variants={dropIn}
            className="commit-modal background"
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}>
            <div
              data-showFiles={isFilesVisible}
              className="commit-modal commit-info-container">
              <div className="commit-author-name">
                <img
                  src={
                    commitInfo.author
                      ? commitInfo.author.avatar_url
                      : 'https://camo.githubusercontent.com/cc6db406f60bc356022df89c92deda2a218d8e5e5efd9de54911d55e52eae4b1/68747470733a2f2f7261772e6769746875622e636f6d2f736568726775742f6e6f64652d7265747269636f6e2f6d61737465722f6578616d706c65732f696d616765732f30362e706e67'
                  }
                  alt=""
                />
                <div className="cont-plus-title">
                  <h3>Commit Author</h3>
                  <div className="commit-author-info-cont">
                    <p>
                      <span>
                        {' '}
                        {commitInfo.commit.author.name}{' '}
                        <BsFillPersonLinesFill className="all-modal-icons commit-author-icon" />
                      </span>
                    </p>
                    <p>
                      GitHub username •
                      <span>
                        {' '}
                        <FiGithub className="all-modal-icons" />{' '}
                        {commitInfo.author
                          ? commitInfo.author.login
                          : 'Not Found'}
                      </span>
                    </p>
                    <p>
                      E-mail •
                      <span>
                        {' '}
                        <AiOutlineMail className="all-modal-icons" />{' '}
                        {commitInfo.commit.author.email}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="commit-details-title">
                <h3>Commit Details</h3>
                <div className="commit-details">
                  <p>
                    Date •{' '}
                    <span>
                      {' '}
                      <BsFillCalendar2DateFill className="all-modal-icons" />{' '}
                      {moment(commitInfo.commit.author.date).format(
                        'DD/MMM/YY HH:MM:SS',
                      )}
                    </span>
                  </p>
                  <p>
                    Files Changed •{' '}
                    <span>
                      {' '}
                      <ImFilesEmpty className="all-modal-icons" />{' '}
                      {commitInfo.files.length}
                    </span>
                  </p>
                  <p>
                    Commit message •{' '}
                    <span>
                      {' '}
                      <BiMessageSquareDetail className="all-modal-icons" />{' '}
                      <q>{commitInfo.commit.message}</q>
                    </span>
                  </p>
                </div>
              </div>
              <div className="commit-stats-container">
                <h3>File changes</h3>
                <div className="commit-stats-title">
                  <div className="commit-stats">
                    <p>
                      Additions •{' '}
                      <span>
                        {' '}
                        <BiPlus className="all-modal-icons" color="green" />
                        <BiPlus className="all-modal-icons" color="green" />
                        {commitInfo.stats.additions}
                      </span>
                    </p>
                    <p>
                      Deletions •{' '}
                      <span>
                        {' '}
                        <BiMinus className="all-modal-icons" color="red" />
                        <BiMinus className="all-modal-icons" color="red" />
                        {commitInfo.stats.deletions}
                      </span>
                    </p>
                  </div>
                  <div className="commit-stats-files-changed">
                    <button
                      className="commit-modal-buttons"
                      onClick={() => setIsFilesVisible(!isFilesVisible)}>
                      Show Files Changed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {isFilesVisible && (
            <div
              data-showFiles={isFilesVisible}
              className="files-changed-container">
              <h3>Files Changed</h3>
              <div className="top-menu-buttons-container">
                {commitInfo.files.map(file => {
                  return (
                    <button
                      className="commit-modal-buttons"
                      key={file.sha}
                      onClick={() => fetchContentFile(file.contents_url)}>
                      {file.filename}
                    </button>
                  );
                })}
              </div>
              <h3>Changes</h3>
              <div className="file-contents-container">
                {/* {fileContents && <pre>{atob(fileContents)}</pre>} */}
                {fileContents && (
                  <CopyBlock
                    text={atob(fileContents)}
                    showLineNumbers={true}
                    language={fileExtension}
                    textColor={'transparent'}
                    theme={dracula}
                    wrapLines
                  />
                )}
              </div>
            </div>
          )}
          <RiCloseFill
            onClick={handleClose}
            className="close-commit-modal-icon"
          />
        </div>
      </Backdrop>
    )
  );
};

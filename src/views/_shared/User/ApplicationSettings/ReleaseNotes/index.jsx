import React from 'react';
import ReactMarkdown from 'react-markdown';
import releaseNotesMarkdown from 'util/release/releaseNotes';
import './styles.less';

const ReleaseNotes = props => {
  return (
    <div className="ReleaseNotes">
      <ReactMarkdown source={releaseNotesMarkdown} escapeHtml={false} />
    </div>
  );
};

export default ReleaseNotes;

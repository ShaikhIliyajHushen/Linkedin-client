import React from 'react';

const HighlightedComment = ({ comment }) => {
  const mentionRegex = /(@\w+)/g;

  const renderCommentWithHighlights = (text) => {
    const parts = text.split(mentionRegex);
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <span key={index} style={{ color: 'blue' }}>
            {part}
          </span>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return <span className='msg'>{renderCommentWithHighlights(comment)}</span>;
};

export default HighlightedComment;

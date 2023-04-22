import React, { FormEvent } from 'react';
import { AppContext } from '../../context/AppContext';

interface CommentFormProps {
  handleSubmit: (text: string, parentId: string | null) => void;
  submitLabel: string;
  initialText?: string;
  hasCancelButton?: boolean;
  handleCancel?: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  handleSubmit,
  submitLabel,
  hasCancelButton,
  handleCancel,
  initialText,
}) => {
  if (initialText === undefined) {
    initialText = '';
  }

  const [text, setText] = React.useState<string>(initialText);

  const isTextAriaDisabled = text.length === 0;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(text, null);
    setText('');
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}></textarea>
      <button className="comment-form-button" disabled={isTextAriaDisabled}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button className="comment-form-button comment-form-cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

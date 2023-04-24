import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface CommentFormProps {
  handleFormSubmit: (text: string, parentId: string | null) => void;
  submitLabel: string;
  initialText?: string;
  hasCancelButton?: boolean;
  handleCancel?: () => void;
}

interface ICommentInput {
  comment: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  handleFormSubmit,
  submitLabel,
  hasCancelButton,
  handleCancel,
  initialText,
}) => {
  if (initialText === undefined) {
    initialText = '';
  }

  const { register, handleSubmit, reset, formState } = useForm();

  // const isTextAriaDisabled = text.length === 0;

  const onSubmit: SubmitHandler<ICommentInput> = (data) => {
    handleFormSubmit(data.comment, null);
    reset();
  };

  return (
    // @ts-ignore
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className="comment-form-textarea"
        defaultValue={initialText}
        {...register('comment', {
          required: true,
        })}></textarea>
      <button className="comment-form-button" disabled={formState.isValid ? false : true}>
        {submitLabel}{' '}
      </button>
      {hasCancelButton && (
        <button className="comment-form-button comment-form-cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

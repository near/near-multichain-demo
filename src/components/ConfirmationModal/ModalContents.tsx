import React from 'react';
import DomainKeyConfirmation from './DomainKeyConfirmation';
import PersonalKeyConfirmation from './PersonalKeyConfirmation';
import { ModalContentsPayload } from './types';
import WarningConfirmation from './WarningConfirmation';

type ModalContentProps = ModalContentsPayload;

const ModalContent: React.FC<ModalContentProps> = ({
  confirmationType,
  confirmationPayload,
}) => {
  let content = null;

  if (confirmationType === 'DOMAIN_KEY') {
    content = <DomainKeyConfirmation payload={confirmationPayload} />;
  } else if (confirmationType === 'PERSONAL_KEY') {
    content = <PersonalKeyConfirmation payload={confirmationPayload} />;
  } else if (confirmationType === 'WRONG_KEY') {
    content = <WarningConfirmation />;
  } else {
    content = <div>Invalid confirmation type</div>;
  }

  return <div>{content}</div>;
};

export default ModalContent;

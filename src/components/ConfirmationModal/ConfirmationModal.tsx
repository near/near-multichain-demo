import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import Button, { ButtonProps } from '@/components/Button';

type ConfirmationModalProps = {
  children: React.ReactNode;
  ctaButtonProps?: ButtonProps;
  isOpen: boolean;
  onClose(): void;
  onSubmit?: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  children,
  isOpen,
  onClose,
  onSubmit,
  ctaButtonProps,
}) => {
  const handleButtonClick = () => {
    onSubmit?.();
    onClose();
  };
  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent w="380px" maxW="380px" mx="auto" borderTopRadius="12px">
        <DrawerCloseButton color="--Sand-Light-11" />

        <DrawerBody p="32px 24px 16px 24px">
          {children}
          <Box mt="32px">
            <Button w="full" onClick={handleButtonClick} {...ctaButtonProps}>
              Submit
            </Button>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

type ModalManagerProps = Omit<ConfirmationModalProps, 'isOpen' | 'onClose'> & {
  triggerFn({ trigger }: { trigger(): void }): React.ReactNode;
};

export const ModalManager: React.FC<ModalManagerProps> = ({
  triggerFn,
  children,
  ...props
}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <ConfirmationModal
        {...props}
        children={children}
        isOpen={isOpen}
        onClose={onToggle}
      />
      {triggerFn({
        trigger: onToggle,
      })}
    </>
  );
};

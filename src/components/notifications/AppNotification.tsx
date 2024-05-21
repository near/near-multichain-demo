import { Image, Text, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import ToastComponent from '@/components/ToastComponent';

type AppNotificationProps = {
  type: 'SUCCESS' | 'ERROR' | 'WARNING';
  title?: string;
  message: string;
  externalLink?: string;
  externalLinkLabel?: string;
};

const ImageIconsTypeMap: Record<string, string> = {
  SUCCESS: 'CheckCircle',
  ERROR: 'ErrorCircle',
  WARNING: 'WarningCircle',
};
const AppNotification: React.FC<AppNotificationProps> = ({
  type,
  title = 'Notification',
  message,
  externalLink,
  externalLinkLabel = 'View',
}) => (
  <ToastComponent align="center" gap={1.5}>
    <Flex justify="space-between" h="full" w="full" align="center">
      <Flex h="full" gap={3}>
        <Image src={`/images/${ImageIconsTypeMap[type.toUpperCase()]}.svg`} />
        <Flex flexDirection="column">
          <Text color="--Sand-Light-12" fontSize="12px" fontWeight={600}>
            {title}
          </Text>
          <Text color="--Sand-Light-11" fontSize="12px" fontWeight={450}>
            {message}
          </Text>
        </Flex>
      </Flex>
      {externalLink && (
        <Link
          color="--Violet-Light-10"
          fontSize="12px"
          fontWeight={600}
          href={externalLinkLabel}
        >
          View
        </Link>
      )}
    </Flex>
  </ToastComponent>
);

export default AppNotification;

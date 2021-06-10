import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent
        bg="gray.900"
        style={{ display: 'block', maxWidth: '900px', maxHeight: '700px' }}
      >
        <ModalBody
          style={{
            width: '900px',
            height: '600px',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: `url(${imgUrl})`,
            top: '0px',
            left: '0px',
          }}
        />
        <ModalFooter
          color="gray.50"
          alignItems="start"
          justifyContent="left"
          position="relative"
        >
          <Link target="_blank" href={imgUrl}>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

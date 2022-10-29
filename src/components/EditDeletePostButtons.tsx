import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useDeletePostMutation } from '../gql/graphql';

interface EditDeletePostButtonsProps {
  id: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
}) => {
  const [, deletepost] = useDeletePostMutation();
  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          // colorScheme={'red'}
          mr={4}
          aria-label={'Edit Post'}
          icon={<EditIcon />}
          onClick={() => {
            // deletepost({ id: p.id });
          }}
        />
      </NextLink>
      <IconButton
        // colorScheme={'red'}
        aria-label={'Delete Post'}
        icon={<DeleteIcon />}
        onClick={() => {
          deletepost({ id });
        }}
      />
    </Box>
  );
};

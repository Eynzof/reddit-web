import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useDeletePostMutation, useMeQuery } from '../gql/graphql';

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  // the user currently logged in
  const [{ data: meData }] = useMeQuery();
  const [, deletepost] = useDeletePostMutation();

  // user not match, 
  // so he doesn't have permission to update or delete the post
  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          mr={4}
          aria-label={'Edit Post'}
          icon={<EditIcon />}
          onClick={() => {
          }}
        />
      </NextLink>
      <IconButton
        aria-label={'Delete Post'}
        icon={<DeleteIcon />}
        onClick={() => {
          deletepost({ id });
        }}
      />
    </Box>
  );
};

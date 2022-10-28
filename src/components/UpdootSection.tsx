import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { ChakraProvider, Flex, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PostSnippetFragment, useVoteMutation } from '../gql/graphql';
import { useToast } from '@chakra-ui/react';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}
export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');
  const toast = useToast();
  // useVoteMutation here
  const [, vote] = useVoteMutation();
  return (
    // This provider is for toast
    <ChakraProvider>
      <Flex
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        mr={4}
      >
        <IconButton
          aria-label={'upvote'}
          icon={<ChevronUpIcon />}
          w={6}
          h={6}
          onClick={async () => {
            // has voted up so nothing happen
            if (post.voteStatus === 1) {
              toast({
                title: `Already voted up`,
                position: 'bottom-left',
                status: 'error',
                duration: 9000,
                isClosable: true,
              });
              return;
            }

            setLoadingState('updoot-loading');
            await vote({
              postId: post.id,
              value: 1,
            });
            setLoadingState('not-loading');
            toast({
              title: `Voted up`,
              position: 'bottom-left',
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
          }}
          isLoading={loadingState === 'updoot-loading'}
          background={post.voteStatus === 1 ? 'green' : 'null'}
          colorScheme={post.voteStatus === 1 ? 'green' : undefined}
        />
        {post.points}
        <IconButton
          aria-label={'downvote'}
          icon={<ChevronDownIcon />}
          w={6}
          h={6}
          background={post.voteStatus === -1 ? 'red' : 'null'}
          onClick={async () => {
            // has voted up so nothing happen
            if (post.voteStatus === -1) {
              toast({
                title: `Already voted down`,
                status: 'error',
                position: 'bottom-left',
                duration: 9000,
                isClosable: true,
              });
              return;
            }
            setLoadingState('updoot-loading');
            await vote({
              postId: post.id,
              value: -1,
            });
            setLoadingState('not-loading');
            toast({
              title: `Voted down`,
              status: 'success',
              position: 'bottom-left',
              duration: 9000,
              isClosable: true,
            });
          }}
          isLoading={loadingState === 'updoot-loading'}
          colorScheme={post.voteStatus === -1 ? 'red' : undefined}
        />
      </Flex>
    </ChakraProvider>
  );
};

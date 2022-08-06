import React, { useCallback, useState, useEffect } from 'react';
import { Flex, Box } from '@blockstack/ui';
import axios from 'axios'

export const TodoList = () => {
  const [nfts, setNfts] = useState(null);

  const fetchNFTs = useCallback(async () => {
    try {
      let nftData = [];
      const { data: { results: collections } } = await axios.get(`https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/nft/holdings?principal=SP3BK1NNSWN719Z6KDW05RBGVS940YCN6X84STYPR`);
      for (let collection of collections) {
        const collectionId = collection.asset_identifier.split("::")[0];

        const { data: { data: { collection_count } } } = await axios.get(`https://gamma.io/api/v1/collections/${collectionId}/0`);

        if (collection_count ===0) continue;
        for (let index = 1; index <= 5; index++) {
          const { data: { data: { token_metadata: { image_url } } } } = await axios.get(`https://gamma.io/api/v1/collections/${collectionId}/${index}`);
          const nft_image_url = image_url.replace("ipfs://", "https://ipfs.io/ipfs/");
          console.log(nft_image_url);
          nftData.push(nft_image_url);
        }
      }
      setNfts(nftData);
    } catch (err) {
      console.error(err);
      setNfts(null);
    }
  }, [])

  useEffect(() => {
    fetchNFTs()
  }, [fetchNFTs])

  return (
    <>
      <Flex>
        <Box maxWidth="660px" width="100%" mx="auto" mt="75px">
          Welcome to the stack!
        </Box>

      </Flex>
      <Box maxWidth="660px" width="100%" mx="auto" mt="75px">
        {nfts ?
          <Box display="flex" flexWrap="wrap" style={{ gap: '8px' }}>
            {nfts.map((nft) => (
              <img key={nft} src={nft} alt="" width="100px" height="100px" />
            ))}
          </Box> : <Box>
            loading...
          </Box>
        }
      </Box>
    </>
  );
};

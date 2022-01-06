import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import * as React from 'react';

// This runs on the server when the request is made (regardless if by a real user or a trawler looking for metadata.)
export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;
  let imageUrl = '';
  if (params?.id === '1') {
    // REST requests can be made here to get the image to pass through
    imageUrl = '/images/BenRL.png';
  }
  if (params?.id === '2') {
    imageUrl = '/images/DannyRL.png';
  }
  return { props: { params, imageUrl } };
};

const TestView: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  console.log(props);
  return (
    <>
      <Head>
        <title>Test</title>
        <meta property="og:title" content="I'm a cool little test" />
        {/* This imageUrl in the head is now populated by the server so will be present in raw HTML metadata without needing to run any JS */}
        <meta property="og:image" content={props.imageUrl} />
        <meta property="og:image:width" content="1000" />
        <meta property="og:image:height" content="1000" />
      </Head>
      <div>
        <h1>Wowzers {props.params.id} </h1>
        <Image layout="fill" src={props.imageUrl}></Image>
      </div>
    </>
  );
};

export default TestView;

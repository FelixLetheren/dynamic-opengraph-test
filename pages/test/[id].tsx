import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import * as React from 'react';

// This runs on the server when the request is made (regardless if by a real user or a trawler looking for metadata.)
export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;
  let imageUrl = '';
  if (params?.id === '1') {
    // REST requests can be made here to get the image to pass through
    imageUrl = 'https://en.wikipedia.org/wiki/File:Dwayne_Johnson_2014_(cropped).jpg';
  }
  if (params?.id === '2') {
    imageUrl = 'https://en.wikipedia.org/wiki/File:Zarya-MU_(6).jpg';
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
      </Head>
      <div>
        <h1>Wowzers {props.params.id} </h1>
      </div>
    </>
  );
};

export default TestView;

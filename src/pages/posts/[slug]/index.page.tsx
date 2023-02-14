import { GetServerSideProps } from 'next'
import { getPrismicClient } from '../../../services/prismic'
import { getServerSession } from 'next-auth/next'
import {
  SpecificPostsContainer,
  SpecificPostsContent,
  SpecificPostsInnerContainer,
} from './styles'
import { authOptions } from '../../api/auth/[...nextauth].api'
import * as prismicH from '@prismicio/helpers'
import Head from 'next/head'

interface IPost {
  slug: string
  title: string
  content: string
  updatedAt: string
}

interface IPostProps {
  post: IPost
}

export default function Post({ post }: IPostProps) {
  return (
    <>
      <Head>
        <title>{`ig.news | ${post.title}`}</title>
      </Head>

      <SpecificPostsContainer>
        <SpecificPostsInnerContainer>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <SpecificPostsContent
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </SpecificPostsInnerContainer>
      </SpecificPostsContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const session = await getServerSession(req, res, authOptions)
  const { slug } = params

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/posts/preview/${slug}`,
        permanent: false,
      },
    }
  }

  const prismic = getPrismicClient({})
  const postsResponse = await prismic.getByUID('posts', slug.toString())

  const post = {
    slug: postsResponse.uid,
    title: prismicH.asText(postsResponse.data.title),
    content: prismicH.asHTML(postsResponse.data.content),
    updatedAt: new Date(postsResponse.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
  }

  return {
    props: {
      post,
    },
  }
}

import { PostItem } from '../../components/PostItem'
import { PostsContainer, PostsInnerContainer } from './styles'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getPrismicClient } from '../../services/prismic'
import * as prismicH from '@prismicio/helpers'

interface IPost {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

interface IPostsProps {
  posts: IPost[]
}

export default function Posts({ posts }: IPostsProps) {
  return (
    <>
      <Head>
        <title>ig.news | Posts</title>
      </Head>

      <PostsContainer>
        <PostsInnerContainer>
          {posts.map((post) => {
            return (
              <PostItem
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.updatedAt}
                href={`/posts/${post.slug}`}
              />
            )
          })}
        </PostsInnerContainer>
      </PostsContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({})
  const postsResponse = await prismic.getByType('posts', { pageSize: 20 })

  const posts = postsResponse.results.map((post) => {
    return {
      slug: post.uid,
      title: prismicH.asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === 'paragraph')
          ?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        },
      ),
    }
  })

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}

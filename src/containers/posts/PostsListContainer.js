import React, { useEffect } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from 'modules/posts';
import PostList from 'components/posts/PostList';
import {
  useLocation,
  useParams,
} from '../../../node_modules/react-router-dom/dist/index';

const PostsListContainer = () => {
  const { username } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
    }),
  );

  useEffect(() => {
    // 변수를 바로 선언하는 것과 중괄호 안에 선언하는 것의 차이는?
    // const { username } = useParams(); // 오류남....
    // const { username } = match.params;
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    // dispatch : 스토어의 내장함수 중 하나로 액션을 발생시키는 것
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, location.search]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default PostsListContainer;

import React from 'react';

import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import Link from 'next/link';

import { Pagination, IPaginationProps } from '../pagination/Pagination';
import { PostItems } from '../utils/Content';

export type IBlogGalleryProps = {
  posts: PostItems[];
  pagination: IPaginationProps;
};

const BlogGallery = (props: IBlogGalleryProps) => (
  <>
    <ul>
      {props.posts.map((elt) => (
        <li key={elt.slug} className="flex justify-between mb-3">
          <Link href="/posts/[slug]" as={`posts/${elt.slug}`}>
            <a>
              <h2>{elt.title}</h2>
            </a>
          </Link>

          <div>{format(new Date(elt.date), 'yy/MM/dd E', { locale: ja })}</div>
        </li>
      ))}
    </ul>

    <Pagination previous={props.pagination.previous} next={props.pagination.next} />
  </>
);

export { BlogGallery };

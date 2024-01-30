import { join } from 'path';

// 서버 프로젝트 루트 폴더
export const PROJECT_ROOT_PATH = process.cwd();
// 외부에서 접근 가능한 파일들을 모아둔 폴더 이름
export const PUBLIC_FOLDER_NAME = 'public';
// 프로필 이미지 저장할 폴더 이름
export const PROFILE_FOLDER_NAME = 'profile';

// 실제 public 폴더의 절대경로
// {프로젝트의 위치}/public
export const PUBLIC_FOLDER_PATH = join(PROJECT_ROOT_PATH, PUBLIC_FOLDER_NAME);

// 프로필 이미지 저장할 위치
// {프로젝트의 위치}/public/profile
export const PROFILE_FOLDER_PATH = join(
  PUBLIC_FOLDER_PATH,
  PROFILE_FOLDER_NAME,
);

// 절대경로 x -> 폴더 경로만
// /public/profile
export const PROFILE_PUBLIC_IMAGE_PATH = join(
  PUBLIC_FOLDER_NAME,
  PROFILE_FOLDER_NAME,
);

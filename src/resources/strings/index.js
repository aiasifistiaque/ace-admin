/** @format */

const production = 'http://localhost:5000';
const dev = 'ace-backend.herokuapp.com';
export const host = production;
const courseList = host + '/api/course/allcourse';
const chapterList = host + '/api/chapter/getchapters';
const createTest = host + '/api/test';
const questionsFromChapter = host + '/api/course/getpracticequestions';
export const getCourseList = courseList;
export const getChapterList = chapterList;
export const getQuestionsFromChapter = questionsFromChapter;
export const getCreateTest = createTest;
export const postHeaders = {
  'Content-Type': 'application/json'
};

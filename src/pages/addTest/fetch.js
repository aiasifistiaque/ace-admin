/** @format */

export const host = 'http://localhost:5000';

export const fetchCourseList = async () => {
  let result;
  await fetch(host + '/api/course/allcourse')
    .then(res => res.json())
    .then(res => {
      console.log(res);
      result = res;
    })
    .catch(err => {
      return [err];
    });
  console.log('happened later');
  return result;
};

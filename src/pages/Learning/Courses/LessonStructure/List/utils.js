export const formatResponseData = (data) => {
  if (!data) return null;
  const lessons = data.lessonStructures?.map((lesson) => {
    const contentUploads = (lesson.contentUploads ?? []).map((content) => ({
      id: content.id,
      name: content.nameContent,
      type: 'content',
      sortOrder: content.sortOrder
    }));

    const exams = (lesson.examSettings ?? []).map(({ exam, sortOrder }) => ({
      id: exam.id,
      name: exam.examTitle,
      type: 'exam',
      sortOrder
    }));

    const surveys = (lesson.surveySettings ?? []).map(({ survey, sortOrder }) => ({
      id: survey.id,
      name: survey.surveyName,
      type: 'survey',
      sortOrder
    }));

    return {
      id: lesson.id,
      name: lesson.nameContent,
      type: 'lesson',
      sortOrder: lesson.sortOrder,
      children: [...contentUploads, ...exams, ...surveys].sort((a, b) => a.sortOrder - b.sortOrder)
    };
  });
  return {
    id: data.id,
    name: data.courseName,
    type: 'course',
    children: (lessons ?? []).sort((a, b) => a.sortOrder - b.sortOrder)
  };
};

/**
 * impure function move item in parent's children
 * @param {*} item
 * @param {*} parent
 * @param {1 | -1} step 1:down / -1:up
 * @returns
 */
export const onMoveNext = (item, parent, step) => {
  const children = parent.children;
  const srcIndex = children.findIndex((c) => c.id === item.id);
  const desIndex = srcIndex + step;
  if (desIndex < 0 || desIndex >= children.length || srcIndex === desIndex) {
    return false;
  } else {
    [children[desIndex], children[srcIndex]] = [children[srcIndex], children[desIndex]];
  }
  return true;
};

/**
 * impure function move item in parent's children to top or bottom
 * @param {*} item
 * @param {*} parent
 * @param {*} margin 1:down / -1:up
 * @returns
 */
export const onMoveToMargin = (item, parent, margin) => {
  const children = parent.children;
  const index = children.findIndex((c) => c.id === item.id);
  if (margin > 0 && index < children.length) {
    children.splice(index, 1);
    children.push(item);
    return true;
  }
  if (margin < 0 && index > 0) {
    children.splice(index, 1);
    children.unshift(item);
    return true;
  }
  return false;
};

export const formatResponseDataActivation = (data) => {
  if (!data) return null;
  const lessons = data.lessonStructures?.map((lesson) => {
    const contentUploads = (lesson.contentUploads ?? []).map((content) => ({
      id: content.id,
      name: content.nameContent,
      type: 'content',
      canDownload: content.canDownload,
      completedOpen: content.completedOpen,
      conditionPass: content.conditionPass,
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
      children: [...contentUploads, ...exams, ...surveys].sort((a, b) => a.sortOrder - b.sortOrder)
    };
  });
  const formatedData = {
    id: data.id,
    name: data.courseName,
    type: 'course',
    completedByOrder: data.completedByOrder,
    children: lessons ?? []
  };
  formatedData.canDownload = isCheckAll(formatedData, 'canDownload');
  formatedData.completedOpen = isCheckAll(formatedData, 'completedOpen');
  return formatedData;
};

export const isCheckAll = (course, field, typesAllowed = ['content']) => {
  for (let i = 0; i < course.children.length; i++) {
    const lesson = course.children[i];
    const hasContent = lesson.children.some((c) => c.type === 'content');
    if (!hasContent) {
      return false;
    }
    for (let j = 0; j < lesson.children.length; j++) {
      const content = lesson.children[j];
      if (typesAllowed.includes(content.type) && !content[field]) {
        return false;
      }
    }
  }
  return true;
};

export const setCheckedRecursiveDown = (checked, data, field, typesAllowed = ['content']) => {
  if (data.children) {
    //loop lesson
    data.children.forEach((lesson) => {
      if (lesson.children) {
        //loop content
        lesson.children.forEach((content) => {
          if (typesAllowed.includes(content.type)) {
            content[field] = checked;
          }
        });
      }
    });
  }
};
export const formatSubmitStructure = (data) => {
  const lessonContentUploads = data.children.reduce((prev, cur) => {
    const contents = cur.children
      .filter((c) => c.type === 'content')
      .map((c) => ({
        canDownload: c.canDownload,
        completedOpen: c.completedOpen,
        contentUploadId: c.id,
        lessonStructureId: cur.id,
        nameContentLesson: cur.name,
        nameContentUpload: c.name,
        conditionPass: c.conditionPass
      }));
    return [...prev, ...contents];
  }, []);

  return {
    completedByOrder: data.completedByOrder,
    courseId: data.id,
    lessonContentUploads
  };
};

export const formatResponseData = (data) => {
  if (!data) return null;
  const lessons = data?.map((lesson) => {
    const contentUploads = (lesson.contentUploads ?? []).map((content) => ({
      ...content,
      id: content?.id,
      name: content?.nameContent,
      lessonStructureId: lesson?.id,
      type: content?.type,
      duration: content?.duration,
      timeLong: content?.timeLong,
      sortOrder: content?.sortOrder,
      completed: content?.completed
    }));

    const exams = (lesson.examSettings ?? []).map((exam) => ({
      ...exam,
      id: exam?.id,
      name: exam?.exam?.examTitle,
      lessonStructureId: lesson?.id,
      type: exam?.type,
      duration: exam?.duration,
      timeLong: exam?.timeLong,
      sortOrder: exam?.sortOrder,
      completed: exam?.completed
    }));

    const surveys = (lesson.surveySettings ?? []).map((survey) => ({
      ...survey,
      id: survey?.id,
      name: survey?.survey?.surveyName,
      lessonStructureId: lesson?.id,
      type: survey?.type,
      duration: survey?.duration,
      timeLong: survey?.timeLong,
      sortOrder: survey?.sortOrder,
      completed: survey?.completed
    }));
    return {
      id: lesson.id,
      name: lesson.nameContent,
      type: 'lesson',
      sortOrder: lesson.sortOrder,
      totalDuration: lesson?.totalLessonDetailOfLessonDuration,
      totalLectures: lesson?.totalLessonDetailOfLesson,
      completedByOrder: lesson?.completedByOrder,
      children: [...contentUploads, ...exams, ...surveys].sort((a, b) => a.sortOrder - b.sortOrder)
    };
  });
  return (lessons ?? []).sort((a, b) => a.sortOrder - b.sortOrder);
};

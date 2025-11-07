import getUserUrl from "@/app/helpers/getUserUrl";
import { ResponseApi } from "@/app/types/api.types";

const userUrl = getUserUrl();

type CourseProgress = {
  completedCourses: {
    courseId: number;
    difficulty: number;
    progressPoint: number;
  }[];
  highestCompletedDifficulty: number;
};

export default async function getCourseProgress(
  languageId: number
): ResponseApi<CourseProgress> {
  const res = await fetch(
    `${userUrl}course/progress?languageId=${languageId}`,
    {
      method: "GET",
    }
  );

  if (res.ok) {
    return await res.json();
  }
  return null;
}

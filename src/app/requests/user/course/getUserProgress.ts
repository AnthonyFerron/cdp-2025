export default async function getUserProgress(languageId: number) {
  try {
    const response = await fetch(
      `/backend/api/user/course/progress?languageId=${languageId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de la progression");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

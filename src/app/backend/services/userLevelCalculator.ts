/**
 * Service de calcul de niveau pour les utilisateurs
 * Formule: XP requis pour niveau N = 1000 + 500 * (N - 1)
 * XP total cumulé = 250 * (level - 1) * (3 + level)
 */

export default class UserLevelCalculator {
  private readonly BASE_XP = 1000; // XP de base pour level 2
  private readonly INCREMENT_XP = 500; // Incrément par niveau

  /**
   * Calcule le niveau actuel en fonction de l'XP total
   * @param totalXP - XP total de l'utilisateur
   * @returns Le niveau calculé (minimum 1)
   */
  calculateLevel(totalXP: number): number {
    if (totalXP < this.BASE_XP) return 1;

    // Formule inversée de la somme arithmétique
    // totalXP = 250 * (level - 1) * (3 + level)
    // Résolution de l'équation quadratique: 250*level^2 + 500*level - 750 - totalXP = 0
    const a = 250;
    const b = 500;
    const c = -750 - totalXP;

    const discriminant = b * b - 4 * a * c;
    const level = (-b + Math.sqrt(discriminant)) / (2 * a);

    return Math.max(1, Math.floor(level) + 1);
  }

  /**
   * Calcule l'XP total nécessaire pour atteindre un niveau donné
   * @param level - Le niveau cible
   * @returns L'XP total cumulé nécessaire
   */
  getXPForLevel(level: number): number {
    if (level <= 1) return 0;
    // Formule: 250 * (level - 1) * (3 + level)
    return 250 * (level - 1) * (3 + level);
  }

  /**
   * Calcule l'XP nécessaire pour passer d'un niveau N au niveau N+1
   * @param level - Le niveau actuel
   * @returns L'XP nécessaire pour monter d'un niveau
   */
  getXPForNextLevel(level: number): number {
    // Formule: 1000 + 500 * (level - 1)
    return this.BASE_XP + this.INCREMENT_XP * (level - 1);
  }

  /**
   * Vérifie si l'utilisateur a level up et retourne les informations de progression
   * @param currentLevel - Niveau actuel stocké en base
   * @param currentXP - XP total de l'utilisateur
   * @returns Informations sur le level up et la progression
   */
  checkLevelUp(
    currentLevel: number,
    currentXP: number
  ): {
    hasLeveledUp: boolean;
    newLevel: number;
    levelsGained: number;
    xpForNextLevel: number;
    xpProgress: number;
    xpNeededForNextLevel: number;
    progressPercentage: number;
  } {
    const calculatedLevel = this.calculateLevel(currentXP);
    const hasLeveledUp = calculatedLevel > currentLevel;
    const levelsGained = calculatedLevel - currentLevel;

    const xpForCurrentLevel = this.getXPForLevel(calculatedLevel);
    const xpForNextLevel = this.getXPForLevel(calculatedLevel + 1);
    const xpProgress = currentXP - xpForCurrentLevel;
    const xpNeededForNextLevel = xpForNextLevel - currentXP;
    const xpRequiredForNextLevel = this.getXPForNextLevel(calculatedLevel);
    const progressPercentage = Math.floor(
      (xpProgress / xpRequiredForNextLevel) * 100
    );

    return {
      hasLeveledUp,
      newLevel: calculatedLevel,
      levelsGained,
      xpForNextLevel,
      xpProgress,
      xpNeededForNextLevel,
      progressPercentage,
    };
  }

  /**
   * Génère un tableau de progression des niveaux
   * @param maxLevel - Niveau maximum à générer
   * @returns Tableau avec les seuils d'XP pour chaque niveau
   */
  generateLevelTable(maxLevel: number = 50): Array<{
    level: number;
    xpTotal: number;
    xpForThisLevel: number;
  }> {
    const table = [];
    for (let level = 1; level <= maxLevel; level++) {
      table.push({
        level,
        xpTotal: this.getXPForLevel(level),
        xpForThisLevel: level === 1 ? 0 : this.getXPForNextLevel(level - 1),
      });
    }
    return table;
  }
}

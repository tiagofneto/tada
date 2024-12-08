import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Define types for the tier tuples
type ContributionTier = [number, number]; // [threshold, percentile]
type FollowerTier = [number, number, number]; // [lowThreshold, highThreshold, bonus]

/**
 * Calculate GitHub percentile based on contributions and follower count
 * 
 * @param contributions - Number of yearly contributions
 * @param followers - Number of followers
 * @returns Final percentile score
 */
export function calculateGithubPercentile(contributions: number, followers: number): number {
    // Define contribution percentile thresholds
    const contributionTiers: ContributionTier[] = [
        [1500, 99.9], [1000, 99], [750, 95], [500, 90],
        [425, 85], [350, 80], [250, 75], [200, 70],
        [150, 65], [100, 60], [75, 55], [52, 50],
        [45, 45], [40, 40], [35, 35], [30, 30],
        [25, 25], [20, 20], [10, 15], [5, 10],
        [3, 5], [1, 1]
    ];
    
    // Define follower bonus tiers
    const followerBonuses: FollowerTier[] = [
        [0, 5, 0], [5, 9, 1], [9, 20, 2], [20, 30, 3],
        [30, 40, 4], [40, 50, 5], [50, 100, 7],
        [100, 200, 12], [200, 1000, 15]
    ];
    
    // Get base percentile from contributions
    let basePercentile = 0;
    for (const [contribThreshold, percentile] of contributionTiers) {
        if (contributions >= contribThreshold) {
            basePercentile = percentile;
            break;
        }
    }
    
    // Get bonus from followers
    let followerBonus = 0;
    for (const [low, high, bonus] of followerBonuses) {
        if (low <= followers && followers < high) {
            followerBonus = bonus;
            break;
        }
    }
    
    // Handle cases above 1000 followers
    if (followers >= 1000) {
        followerBonus = 15;
    }
    
    // Calculate final percentile (capped at 100)
    const finalPercentile = Math.min(basePercentile + followerBonus, 100);
    
    return finalPercentile;
}

// Example usage with type checking
const contributions = 500;
const followers = 25;
const score: number = calculateGithubPercentile(contributions, followers);
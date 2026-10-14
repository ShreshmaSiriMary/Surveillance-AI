// SENTINEL-AI Engine — Face Detection & 128-D KNN Similarity Vector Matcher Utility
// Responsible AI Disclaimer: All similarity scores and vector distances are candidate estimates requiring human officer review.

// Generate a 128-dimensional synthetic embedding vector (unit normalized)
export function generateRandomEmbedding(seed = 1) {
  const vector = [];
  let sumSq = 0;
  for (let i = 0; i < 128; i++) {
    const val = Math.sin(seed * (i + 1) * 997) * 0.5 + Math.cos(seed * (i + 1) * 313) * 0.5;
    vector.push(val);
    sumSq += val * val;
  }
  const norm = Math.sqrt(sumSq) || 1;
  return vector.map(v => parseFloat((v / norm).toFixed(4)));
}

// Calculate Euclidean Distance between two 128-D vectors
export function calculateEuclideanDistance(vectorA, vectorB) {
  if (!vectorA || !vectorB || vectorA.length !== vectorB.length) return 1.0;
  let sumSq = 0;
  for (let i = 0; i < vectorA.length; i++) {
    const diff = vectorA[i] - vectorB[i];
    sumSq += diff * diff;
  }
  return parseFloat(Math.sqrt(sumSq).toFixed(4));
}

// Calculate Cosine Similarity (%) between two 128-D vectors
export function calculateCosineSimilarity(vectorA, vectorB) {
  if (!vectorA || !vectorB || vectorA.length !== vectorB.length) return 50.0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    normA += vectorA[i] * vectorA[i];
    normB += vectorB[i] * vectorB[i];
  }
  const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB) || 1);
  return parseFloat((((similarity + 1) / 2) * 100).toFixed(1));
}

// Perform K-Nearest Neighbors (KNN) Candidate Ranking Search
export function performKnnSearch(queryEmbedding, targetDatabase, k = 5, distanceThreshold = 0.65) {
  if (!queryEmbedding || !targetDatabase || targetDatabase.length === 0) return [];

  const candidates = targetDatabase.map(record => {
    const targetEmbed = record.facialEmbeddings || generateRandomEmbedding((record.name || 'target').length);
    const distance = calculateEuclideanDistance(queryEmbedding, targetEmbed);
    const similarity = calculateCosineSimilarity(queryEmbedding, targetEmbed);

    return {
      ...record,
      distance,
      similarity,
      isCandidateMatch: distance <= distanceThreshold,
      matchCategory: similarity > 85 ? 'POTENTIAL MATCH — HUMAN REVIEW REQUIRED' : 'LOW SIMILARITY'
    };
  });

  candidates.sort((a, b) => a.distance - b.distance);

  return candidates.slice(0, k);
}

// Alias export for backward compatibility
export const findKNearestMatches = performKnnSearch;

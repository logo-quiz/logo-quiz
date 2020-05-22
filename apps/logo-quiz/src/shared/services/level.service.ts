import { Level } from '@logo-quiz/models';
import { restApi } from '../api/calls';

export async function fetchLevels() {
  const levels = await restApi.get<Level[]>('/levels');
  return levels.data;
}

export async function fetchLevel(id: String) {
  const level = await restApi.get<Level>(`/levels/${id}`);
  return level.data;
}

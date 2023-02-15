import { firestore } from "firebase-admin";

export const collections = {
  _get: (...path: string[]) => [firestore(), ...path] as const,
  busstop: (route: string) => collections.busstops.of(route),
  busstops: {
    get: (...path: string[]) => collections._get('busstops', ...path),
    of: (route: string) => {
      const get = (...path: string[]) => collections.busstops.get(route, ...path);
      const comments = {
        get: (...path: string[]) => get('comments', ...path),
        of: (commentId: string) => ({
          get: (...path: string[]) => comments.get(commentId, ...path),
        } as const),
      } as const;
      
      return {
        get,
        comment: (commentId: string) => comments.of(commentId),
        comments,
      } as const;
    },
  } as const,
} as const;
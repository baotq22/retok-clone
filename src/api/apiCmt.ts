/* eslint-disable @typescript-eslint/no-explicit-any */
export const getComments = async () => {
    return [
      {
        id: "1",
        body: "First comment",
        username: "Jack",
        userId: "1",
        parentId: null,
        createdAt: "2021-08-16T23:00:33.010+02:00",
        reactionAmount: "123",
      },
      {
        id: "2",
        body: "Second comment",
        username: "John",
        userId: "2",
        parentId: null,
        createdAt: "2021-08-16T23:00:33.010+02:00",
        reactionAmount: "575",
      },
      {
        id: "3",
        body: "First comment first child",
        username: "John",
        userId: "2",
        parentId: "1",
        createdAt: "2021-08-16T23:00:33.010+02:00",
        reactionAmount: "176",
      },
      {
        id: "4",
        body: "Second comment second child",
        username: "John",
        userId: "2",
        parentId: "2",
        createdAt: "2021-08-16T23:00:33.010+02:00",
        reactionAmount: "354",
      },
    ];
  };

  const userComment = localStorage.getItem('username');
  const user_id = localStorage.getItem('id');
  
  export const createComment = async (text: any, parentId = null) => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      body: text,
      parentId,
      userId: user_id,
      username: userComment,
      createdAt: new Date().toISOString(),
      reactionAmount: "0"
    };
  };
  
  export const updateComment = async (text: any) => {
    return { text };
  };
  
  export const deleteComment = async () => {
    return {};
  };
  
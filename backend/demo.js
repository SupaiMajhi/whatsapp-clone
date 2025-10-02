updatePrevChatListWithOffline: (offlineMessages) => {
  set((state) => {
    let updated = [...state.prevChatList];

    offlineMessages.forEach(({ message }) => {
      const senderId = message.senderId;
      const receiverId = message.receiverId;

      // check if chat already exists
      const existingChat = updated.find(
        (chat) =>
          (chat.otherUser._id === senderId) || // message from them
          (chat.otherUser._id === receiverId)   // message you sent
      );

      if (existingChat) {
        // update lastMessage if this message is newer
        if (new Date(message.createdAt) > new Date(existingChat.lastMessage.createdAt)) {
          updated = updated.map((chat) =>
            chat.otherUser._id === senderId || chat.otherUser._id === receiverId
              ? { ...chat, lastMessage: message }
              : chat
          );
        }
      } else {
        // new chat (build the structure like prevChatList expects)
        updated.push({
          _id: {
            senderId,
            receiverId,
          },
          lastMessage: message,
          otherUser: {
            _id: senderId, // since offline msg is from them
            username: message.senderName || "Unknown", // depends on what server sends
            profilePic: message.senderPic || null,
          },
        });
      }
    });

    // sort by latest message timestamp (descending)
    updated.sort(
      (a, b) =>
        new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
    );

    return { prevChatList: updated };
  });
}

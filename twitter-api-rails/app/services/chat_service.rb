# frozen_string_literal: true

class ChatService
  def create_thread(participant_ids)
    @participant_ids = participant_ids.map(&:to_s).uniq.sort

    existing_thread = ChatThread
                        .joins(:chat_thread_participants)
                        .where(chat_thread_participants: { user_id: @participant_ids })
                        .group('chat_threads.id')
                        .having(
                          'ARRAY_AGG(chat_thread_participants.user_id::text ORDER BY chat_thread_participants.user_id::text) = ARRAY[?]::text[]',
                          @participant_ids
                        ).first

    return existing_thread if existing_thread

    ChatThread.create!.tap do |thread|
      participant_ids.each do |user_id|
        thread.chat_thread_participants.create!(user_id: user_id)
      end
    end
  end
end

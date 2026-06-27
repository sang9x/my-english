import {
  createTopic,
  getTopicById,
  deleteTopic,
  addWord,
  getWordsByTopicId,
  deleteWord
} from '../lib/db';

describe('Database Layer', () => {
  const testTopicId = 'test-topic-id';
  const testWordId = 'test-word-id';

  beforeAll(() => {
    // Clean up if previous tests failed
    try { deleteTopic(testTopicId); } catch {}
  });

  afterAll(() => {
    try { deleteTopic(testTopicId); } catch {}
  });

  test('should perform CRUD operations on topics and words', () => {
    // 1. Create Topic
    const topic = createTopic({
      id: testTopicId,
      name: 'Test Topic Name',
      description: 'Test Topic Description',
      emoji: '🧪',
      shareCode: 'TESTCD',
    });

    expect(topic.name).toBe('Test Topic Name');
    expect(topic.shareCode).toBe('TESTCD');

    // 2. Fetch Topic
    const fetched = getTopicById(testTopicId);
    expect(fetched).not.toBeNull();
    expect(fetched?.name).toBe('Test Topic Name');

    // 3. Add Word
    const wordRes = addWord({
      id: testWordId,
      topicId: testTopicId,
      english: 'testword',
      vietnamese: ['từ kiểm thử', 'từ test'],
      ipa: '/test/',
      example: 'This is a test.',
      exampleVi: 'Đây là một bài kiểm tra.',
    });

    expect(wordRes.duplicate).toBe(false);
    expect(wordRes.word).not.toBeNull();
    expect(wordRes.word?.english).toBe('testword');

    // Check duplicate prevention
    const dupRes = addWord({
      id: 'dup-id',
      topicId: testTopicId,
      english: 'testword',
      vietnamese: ['từ trùng'],
    });
    expect(dupRes.duplicate).toBe(true);

    // 4. Fetch Words
    const words = getWordsByTopicId(testTopicId);
    expect(words.length).toBe(1);
    expect(words[0].english).toBe('testword');

    // 5. Delete Word
    const deletedWord = deleteWord(testWordId);
    expect(deletedWord).toBe(true);
    expect(getWordsByTopicId(testTopicId).length).toBe(0);

    // 6. Delete Topic
    const deletedTopic = deleteTopic(testTopicId);
    expect(deletedTopic).toBe(true);
    expect(getTopicById(testTopicId)).toBeNull();
  });
});

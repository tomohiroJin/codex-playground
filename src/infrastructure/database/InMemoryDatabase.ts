/**
 * インメモリデータベースクラス
 * 開発環境用の簡易的なデータストレージ
 */
export class InMemoryDatabase {
  private static instance: InMemoryDatabase;
  private storage: Map<string, Map<string, any>>;

  private constructor() {
    this.storage = new Map<string, Map<string, any>>();
  }

  /**
   * シングルトンインスタンスを取得する
   * @returns InMemoryDatabaseのインスタンス
   */
  public static getInstance(): InMemoryDatabase {
    if (!InMemoryDatabase.instance) {
      InMemoryDatabase.instance = new InMemoryDatabase();
    }
    return InMemoryDatabase.instance;
  }

  /**
   * コレクションを取得する（存在しない場合は作成する）
   * @param collectionName コレクション名
   * @returns コレクションのMap
   */
  public getCollection<T>(collectionName: string): Map<string, T> {
    if (!this.storage.has(collectionName)) {
      this.storage.set(collectionName, new Map<string, T>());
    }
    return this.storage.get(collectionName) as Map<string, T>;
  }

  /**
   * エンティティを保存する
   * @param collectionName コレクション名
   * @param id エンティティID
   * @param entity 保存するエンティティ
   * @returns 保存されたエンティティ
   */
  public save<T>(collectionName: string, id: string, entity: T): T {
    const collection = this.getCollection<T>(collectionName);
    collection.set(id, entity);
    return entity;
  }

  /**
   * IDでエンティティを検索する
   * @param collectionName コレクション名
   * @param id 検索するエンティティID
   * @returns 見つかったエンティティ、見つからない場合はnull
   */
  public findById<T>(collectionName: string, id: string): T | null {
    const collection = this.getCollection<T>(collectionName);
    return collection.has(id) ? (collection.get(id) as T) : null;
  }

  /**
   * コレクション内のすべてのエンティティを取得する
   * @param collectionName コレクション名
   * @returns エンティティの配列
   */
  public findAll<T>(collectionName: string): T[] {
    const collection = this.getCollection<T>(collectionName);
    return Array.from(collection.values());
  }

  /**
   * 条件に一致するエンティティを検索する
   * @param collectionName コレクション名
   * @param predicate フィルタ関数
   * @returns 条件に一致するエンティティの配列
   */
  public find<T>(
    collectionName: string,
    predicate: (entity: T) => boolean
  ): T[] {
    const collection = this.getCollection<T>(collectionName);
    return Array.from(collection.values()).filter(predicate);
  }

  /**
   * エンティティを削除する
   * @param collectionName コレクション名
   * @param id 削除するエンティティID
   * @returns 削除に成功した場合はtrue、そうでない場合はfalse
   */
  public delete(collectionName: string, id: string): boolean {
    const collection = this.getCollection(collectionName);
    return collection.delete(id);
  }

  /**
   * コレクション内のすべてのエンティティを削除する
   * @param collectionName コレクション名
   */
  public clear(collectionName: string): void {
    const collection = this.getCollection(collectionName);
    collection.clear();
  }

  /**
   * すべてのコレクションを削除する
   */
  public clearAll(): void {
    this.storage.clear();
  }
}

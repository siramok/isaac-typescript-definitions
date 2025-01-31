declare const StageAPI: StageAPIInterface | undefined;

interface StageAPICallbackParameters {
  [StageAPICallback.POST_CHANGE_ROOM_GFX]: [callback: (this: void) => void];

  [StageAPICallback.POST_CHECK_VALID_ROOM]: [
    callback: (
      this: void,
      roomList: unknown,
      seed: int,
      shape: RoomShape,
      rType: RoomType,
      requireRoomType: unknown,
    ) => void,
  ];

  [StageAPICallback.POST_CUSTOM_DOOR_UPDATE]: [
    callback: (
      door: unknown,
      data: unknown,
      sprite: unknown,
      customDoor: unknown,
      persistData: unknown,
    ) => void,
  ];

  [StageAPICallback.POST_CUSTOM_GRID_PROJECTILE_HELPER_UPDATE]: [
    callback: (
      customGridEntity: unknown,
      projectileHelper: unknown,
      projectileHelperParent: unknown,
    ) => void,
  ];

  [StageAPICallback.POST_CUSTOM_GRID_PROJECTILE_UPDATE]: [
    callback: (customGridEntity: unknown, projectile: unknown) => void,
  ];

  [StageAPICallback.POST_CUSTOM_GRID_REMOVE]: [
    callback: (
      spawnIndex: unknown,
      persistData: unknown,
      customGrid: unknown,
      customGridTypeName: unknown,
    ) => void,
  ];

  [StageAPICallback.POST_CUSTOM_GRID_UPDATE]: [
    callback: (customGridEntity: unknown) => void,
  ];

  [StageAPICallback.POST_GRID_UPDATE]: [callback: () => void];

  [StageAPICallback.POST_OVERRIDDEN_GRID_BREAK]: [
    callback: (
      this: void,
      gridIndex: int,
      grid: GridEntity,
      justBrokenGridSpawns:
        | LuaTable<int, StageAPIRemovedEntityData>
        | undefined,
    ) => false | void,
  ];

  [StageAPICallback.POST_ROOM_INIT]: [
    callback: (
      this: void,
      currentRoom: StageAPILevelRoom,
      fromSaveData: unknown,
      saveData: unknown,
    ) => void,
  ];

  [StageAPICallback.POST_ROOM_LOAD]: [
    callback: (
      this: void,
      currentRoom: StageAPILevelRoom,
      isFirstLoad: boolean,
      isExtraRoom: boolean,
    ) => void,
  ];

  [StageAPICallback.POST_SPAWN_CUSTOM_DOOR]: [
    callback: (
      door: unknown,
      data: unknown,
      sprite: unknown,
      customDoor: unknown,
      persistData: unknown,
      index: unknown,
      force: unknown,
      respawning: unknown,
      grid: unknown,
      customGrid: unknown,
    ) => void,
  ];

  [StageAPICallback.POST_SPAWN_CUSTOM_GRID]: [
    callback: (
      customGridEntity: unknown,
      force: unknown,
      respawning: unknown,
    ) => void,
  ];

  [StageAPICallback.POST_STAGEAPI_NEW_ROOM]: [callback: () => void];

  [StageAPICallback.POST_STAGEAPI_NEW_ROOM_GENERATION]: [
    callback: (justGenerated: unknown, currentRoom: unknown) => void,
  ];

  [StageAPICallback.PRE_BOSS_SELECT]: [
    callback: (bosses: unknown, allowHorseman: unknown, rng: unknown) => void,
  ];

  [StageAPICallback.PRE_CHANGE_ROOM_GFX]: [
    callback: (currentRoom: unknown) => void,
  ];

  [StageAPICallback.PRE_ROOM_LAYOUT_CHOOSE]: [
    callback: (
      this: void,
      currentRoom: unknown,
      roomsList: unknown,
    ) => StageAPICustomRoomConfig | undefined,
  ];

  [StageAPICallback.PRE_SELECT_ENTITY_LIST]: [
    callback: (
      entityList: unknown,
      spawnIndex: unknown,
      addEntities: unknown,
    ) => void,
  ];

  [StageAPICallback.PRE_SELECT_GRIDENTITY_LIST]: [
    callback: (gridDataList: unknown, spawnIndex: unknown) => void,
  ];

  [StageAPICallback.PRE_SELECT_NEXT_STAGE]: [
    callback: (currentStage: unknown) => void,
  ];

  [StageAPICallback.PRE_SPAWN_ENTITY]: [
    callback: (
      entityInfo: unknown,
      entityList: unknown,
      index: unknown,
      doGrids: unknown,
      doPersistentOnly: unknown,
      doAutoPersistent: unknown,
      avoidSpawning: unknown,
      persistenceData: unknown,
      shouldSpawnEntity: unknown,
    ) => void,
  ];

  [StageAPICallback.PRE_SPAWN_ENTITY_LIST]: [
    callback: (
      entityList: unknown,
      spawnIndex: unknown,
      doGrids: unknown,
      doPersistentOnly: unknown,
      doAutoPersistent: unknown,
      avoidSpawning: unknown,
      persistenceData: unknown,
    ) => void,
  ];

  [StageAPICallback.PRE_SPAWN_GRID]: [
    callback: (
      this: void,
      gridData: unknown,
      gridInformation: unknown,
      entities: unknown,
      gridSpawnRNG: RNG,
    ) => boolean | undefined,
  ];

  [StageAPICallback.PRE_STAGEAPI_NEW_ROOM]: [callback: (this: void) => void];

  [StageAPICallback.PRE_TRANSITION_RENDER]: [callback: () => void];

  [StageAPICallback.PRE_UPDATE_GRID_GFX]: [callback: () => void];
}

/** @noSelf */
interface StageAPIInterface {
  /**
   * Stores a function and its params in a table indexed by `ID` and sorted by `priority`,
   * where low priority is at the start.
   */
  AddCallback<T extends StageAPICallback>(
    modID: string,
    id: T,
    priority: int,
    ...args: StageAPICallbackParameters[T]
  ): void;

  /**
   * Convenience function that assembles filenames and packages them in a {@link Backdrop} for
   * you.
   *
   * @param prefix the path to the directory containing the backdrop spritesheets,
   * as well as any shared prefix.
   *
   *  Ex: "gfx/backdrop/revel1/glacier/main_"
   * @param suffix Generally the file extension, i.e. `".png"`.
   */
  BackdropHelper(
    backdrop: StageAPIBackdrop | StageAPIBackdrop[],
    prefix: string,
    suffix: string,
  ): StageAPIBackdrop[];

  ChangeBackdrop(
    backdrop: StageAPIBackdrop,
    justWalls?: boolean,
    storeBackdropEntities?: false,
  ): void;
  ChangeBackdrop(
    backdrop: StageAPIBackdrop,
    justWalls: boolean,
    storeBackdropEntities: true,
  ): Entity[];

  /** Function to create a custom floor layout. */
  CreateMapFromRoomsList(roomsList: StageAPIRoomsList): StageAPILevelMap;

  /**
   * Creates a new custom stage.
   *
   * @param name MUST BE UNIQUE. USED TO IDENTIFY STAGE AND FOR SAVING CURRENT STAGE.
   * @param noSetReplaces Replaces defaults to catacombs one if noSetReplaces is not set.
   */
  CustomStage(
    name: string,
    stageOverrideStage?: StageAPIStageOverrideStage,
    noSetReplaces?: boolean,
  ): StageAPICustomStage;

  /** Used to go to a specific room when on a custom StageAPI floor. */
  ExtraRoomTransition(
    levelMapRoomID: int,
    direction: Direction,
    transitionType: RoomTransitionAnim,
    levelMapID: unknown,
    leaveDoor?: int,
    enterDoor?: int,
    setPlayerPosition?: unknown,
    extraRoomBaseType?: unknown,
  ): void;

  /**
   * On the first run after opening the game for the first time, StageAPI gathers a bunch of data
   * from vanilla rooms so that it can properly build custom stages. If a mod is initializing a
   * custom stage, they must first check on every PostRender frame until this method returns true.
   */
  FinishedLoadingData(): boolean;

  GetCurrentLevelMap(): StageAPILevelMap;

  GetCurrentRoom(): StageAPILevelRoom | undefined;

  /** Roughly analogous to the vanilla `Level.GetCurrentRoomIndex` function. */
  GetCurrentRoomID(): int;

  GetCustomGrids(
    index: int | undefined,
    name: string,
  ): StageAPICustomGridEntity[];

  /** Teleports the player(s) to a specified stage */
  GotoCustomStage(
    customStage: StageAPICustomStage,
    playTransition?: boolean,
    noForgetSeed?: boolean,
  ): void;

  GridGfx(): StageAPIGridGfx;

  InitCustomLevel(levelMap: StageAPILevelMap, levelStartRoom: boolean): void;

  LoadCustomMapRoomDoors(
    levelRoom: StageAPILevelRoom,
    roomData: StageAPIRoomData,
    levelMap?: StageAPILevelMap,
  ): void;

  /** Constructor for the RoomGfx object. */
  RoomGfx(
    backdrop: StageAPIBackdrop,
    gridGfx: StageAPIGridGfx | undefined,
    shadingName: string,
    shadingPrefix: string,
  ): StageAPIRoomGfx;

  RoomsList(name: string, ...layouts: unknown[]): StageAPIRoomsList;

  /** Unregisters all mod callbacks, should be used when a mod loads, useful for `luamod`. */
  UnregisterCallbacks(modID: string): void;

  Callbacks: Record<StageAPICallback, unknown>;

  StageOverride: {
    CatacombsOne: 1;
    CatacombsTwo: 2;
  };
}

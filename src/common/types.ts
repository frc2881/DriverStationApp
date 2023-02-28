import { Rectangle } from "electron";
import { 
  AppWindowType,
  AppServerMessageType,
  NetworkTablesServiceMessageType,
  NetworkTablesDataType,
  CameraName
} from "./enums";
import { ParsedArgs } from "minimist";

export type AppArguments = ParsedArgs & {
  ntServerAddress: string;
  ntVersion: number;
}

export type ConfigurationSettings = {
  Defaults: {
    NT_SERVER_ADDRESS: string;
    NT_VERSION: number;
  };
  APP_SERVER_PORT: number;
  NT3_SERVER_PORT: number;
  NT4_SERVER_PORT: number;
  WINDOW_MAX_WIDTH: number;
  WINDOW_MAX_HEIGHT: number;
  FRC_DS_APP_DOCKED_HEIGHT: number;
  FPGA_TIMESTAMP_TOPIC_NAME: string;
  SUBSCRIPTIONS: string[];
  CAMERA_STREAMS: Record<CameraName, string>;
  MATCH_TIME_TRIGGERS: {
    WARNING: number;
    CRITICAL: number;
  }
}

export type AppWindowOptions = {
  title: string;
  bounds: Rectangle;
  isMinimized: boolean;
  isTransparent: boolean;
  isFrameless: boolean;
}

export type AppServerMessage = {
  type: AppServerMessageType;
  message: Record<string, any>;
}

export type NetworkTablesServiceMessage = {
  type: NetworkTablesServiceMessageType;
  data: Record<string, any>;
}

export type NetworkTablesConnectionChangedMessage = NetworkTablesServiceMessage & {
  data: { 
    address: string;
    isConnected: boolean; 
  }
}

export type NetworkTablesTopicsUpdatedMessage = NetworkTablesServiceMessage & {
  data: { 
    topics: NetworkTablesTopic[]; 
  }
}

export type NetworkTablesTopicsRemovedMessage = NetworkTablesServiceMessage & {
  data: { 
    topics: NetworkTablesTopic[]; 
  }
}

export type NetworkTablesTopic = {
  name: string;
  id: number;
  pubuid?: number;
  timestamp?: number;
  type: NetworkTablesDataType;
  value?: any;
}

export type NetworkTablesTopics = Map<string, NetworkTablesTopic>;

export type NetworkTables = {
  address: string;
  isConnected: boolean;
  topics: NetworkTablesTopics;
}

export type Pose = {
  x: number;
  y: number;
  rotation: number;
}

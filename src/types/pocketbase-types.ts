/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Chats = "chats",
	Messages = "messages",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: { [key: string]: any }
}

export type AuthSystemFields = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields

// Record types for each collection

export type ChatsRecord = {
	users?: RecordIdString
}

export type MessagesRecord = {
	chat_id?: RecordIdString
	author_id?: RecordIdString
	content?: string
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ChatsResponse = ChatsRecord & BaseSystemFields
export type MessagesResponse = MessagesRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	chats: ChatsRecord
	messages: MessagesRecord
	users: UsersRecord
}
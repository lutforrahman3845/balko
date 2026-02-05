export type NotificationType =
    | 'assignment'
    | 'status-change'
    | 'dependency'
    | 'approval'
    | 'due-date'
    | 'overdue'
    | 'milestone'
    | 'mention'
    | 'comment'
    | 'file'
    | 'system';

export interface INotificationUser {
    name: string;
    avatar: string | undefined | null;
    role?: string;
}

export interface INotificationTask {
    id?: string;
    title: string;
    status?: string;
    dueDate?: string;
}

export interface INotificationFile {
    name: string;
    extension?: string;
    url?: string;
}

export interface INotificationMilestone {
    name: string;
    deadline: string;
}

export interface INotificationPayload {
    task?: INotificationTask;
    file?: INotificationFile;
    milestone?: INotificationMilestone;
    comment?: string;
    statusChange?: {
        from: string;
        to: string;
    };
    link?: string;
}

export interface INotification {
    id: string;
    type: NotificationType;
    sender?: INotificationUser;
    title: string;
    isUnread?: boolean;
    payload?: INotificationPayload;
    createdAt: string;
    updatedAt: string;
}
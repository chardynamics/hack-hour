import { KnownBlock } from "@slack/bolt";
import { Actions, Environment } from "../../../../lib/constants.js";

export class ReviewView {
    public static reviewStart({
        permalink,
        text,
    }: {
        permalink: string,
        text: string,
    }): KnownBlock[] {
        return [
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": `>_${text.split('\n').join('_\n>')}`,
                    "emoji": true
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": 
`<${permalink}|Preview>`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Click Me",
                        "emoji": true
                    },
                    "url": permalink,
                    "action_id": Actions.START_REVIEW
                }
            }
        ];
    }

    public static session({
        createdAt,
        minutes,
        text,
        link,
        recId
    }: {
        createdAt: string,
        minutes: number,
        text: string,
        link: string,
        recId: string
    }): KnownBlock[] {
        return [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `${createdAt} - ${minutes} minutes\n>_${text}_\n<${link}|View Session>`
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Approve",
                            "emoji": true
                        },
                        "value": recId, 
                        "action_id": Actions.APPROVE
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Reject",
                            "emoji": true
                        },
                        "value": recId, 
                        "action_id": Actions.REJECT
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Reject & Lock",    
                            "emoji": true
                        },
                        "value": recId,
                        "action_id": Actions.REJECT_LOCK
                    }
                ]
            }
        ];
    }

    public static approved(sessionId: string, slackId: string | null = null) {
        return [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Approved ${slackId ? `by <@${slackId}>` : ` session!`}`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Undo",
                        "emoji": true
                    },
                    "value": sessionId,
                    "action_id": Actions.UNDO
                }
            },
        ]
    }

    public static rejected(sessionId: string, slackId: string | null = null) {
        return [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Rejected ${slackId ? `by <@${slackId}>` : ` session!`}`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Undo",
                        "emoji": true
                    },
                    "value": sessionId,
                    "action_id": Actions.UNDO
                }
            },
        ]
    }

    public static rejectedLock(sessionId: string, slackId: string | null = null) {
        return [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Rejected and locked ${slackId ? `by <@${slackId}>` : ` session!`}`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Undo",
                        "emoji": true
                    },
                    "value": sessionId,
                    "action_id": Actions.UNDO
                }
            },
        ]
    }
}
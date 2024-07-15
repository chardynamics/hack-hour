import { KnownBlock, RichTextQuote } from "@slack/bolt";
import { Actions, Environment } from "../../lib/constants.js";
import { formatHour, pfps, randomChoice, t } from "../../lib/templates.js";
export class View {
    public static ticket({
        postBody,
        permalink,
        posterSlackId,
        recordId
    }: {
        postBody: string,
        permalink: string,
        posterSlackId: string,
        recordId: string
    }): KnownBlock[] {
        return [
            {
                "type": "rich_text",
                "elements": [
                    {
                        "type": "rich_text_section",
                        "elements": [
                            {
                                "type": "user",
                                "user_id": posterSlackId
                            }
                        ]
                    },
                    {
                        "type": "rich_text_quote",
                        "elements": [
                            {
                                "type": "text",
                                "style": {
                                    "italic": true
                                },
                                "text": postBody
                            }
                        ]
                    }
                ]
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text":
                        `<${permalink}|Open In Slack>
<https://airtable.com/app4kCWulfB02bV8Q/tbl7FAJtLixWxWC2L/viwjGIE5EEQdBwLs7/${recordId}|Open In Airtable>`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Start Review",
                        "emoji": true
                    },
                    "url": permalink,
                    "action_id": Actions.START_REVIEW
                }
            }
        ];
    }

    public static claimedTicket({
        reviewerSlackId: slackId,
        permalink,
        recordId: recordId,
    }: {
        reviewerSlackId: string,
        permalink: string,
        recordId: string
    }): KnownBlock[] {
        return [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    // "text": `Review started by <@${body.user.id}>.`
                    "text": t('review.start', { slackId })
                }
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": `<${permalink}|Open In Slack> • <https://airtable.com/app4kCWulfB02bV8Q/tbl2q5GGdwv252A7q/viwe3w2MTPRpa9uSB/${recordId}|Open In Airtable>`
                    }
                ]
            }
        ];
    }

    public static userOverview({
        scrapbookId,
        hours,
        sessions,
        reviewed,
        flagged
    }: {
        scrapbookId: string,
        hours: number,
        sessions: number,
        reviewed: number,
        flagged: string
    }): KnownBlock[] {
        return [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text":
                        `*User Overview* ${pfps['info']}
total hours logged: ${formatHour(hours)} hours
total hours approved: ${formatHour(reviewed)} hours
sessions linked: ${sessions}
flag: ${flagged == `✅ Didn't Commit Fraud` ? `none` : flagged}`
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": `magic happening :sparkles:`,
                        },
                        "action_id": Actions.MAGIC,
                        "value": scrapbookId
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": `unsubmit :bangbang:`,
                            "emoji": true,
                        },
                        "style": "danger",
                        "action_id": Actions.UNSUBMIT,
                        "value": scrapbookId,

                        "confirm": {
                            "title": {
                                "type": "plain_text",
                                "text": `are you sure? ${pfps['freaking']}`,
                                "emoji": true
                            },
                            "confirm": {
                                "type": "plain_text",
                                "text": "yes, unsubmit",
                            },
                            "deny": {
                                "type": "plain_text",
                                "text": "i shouldn't have clicked that",
                            },
                            "text": {
                                "type": "mrkdwn",
                                "text": "woah bud, this will remove all sessions linked to this scrapbook. are you sure?"
                            }
                        }
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": `is shipped?`,
                            "emoji": true,
                        },
                        "style": "primary",
                        "action_id": Actions.SHIPPED,
                        "value": scrapbookId
                    }
                ]
            }
        ];
    }

    public static session({
        createdAt,
        minutes,
        text,
        link,
        recId,
        urls,
        evidence,
        images
    }: {
        recId: string

        createdAt: string,
        minutes: number,
        link: string,

        text: string,
        evidence: string,
        urls?: string[],
        images?: string[]
    }): KnownBlock[] {
        const blocks: KnownBlock[] = [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": `${new Date(createdAt).toDateString().toLowerCase()} - ${minutes} minutes ${randomChoice([
                        pfps['woah'],
                        pfps['cute'],
                        pfps['thumbs'],
                        pfps['info']
                    ])}`,
                    "emoji": true
                }
            },
        ];

        blocks.push({
            "type": "rich_text",
            "elements": [
                {
                    "type": "rich_text_preformatted",
                    "elements": [
                        {
                            type: "text",
                            "text": text ? text : "no text provided"
                        }
                    ]
                },
            ]
        });

        if (urls) {
            blocks.push({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `urls:\n${urls.join('\n')}`
                }
            });
        }

        blocks.push(
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": `<${link}|open in slack> • <https://airtable.com/app4kCWulfB02bV8Q/tbl2q5GGdwv252A7q/viwe3w2MTPRpa9uSB/${recId}|override on airtable>`
                    }
                ]
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": `approve ${pfps['cute']}`,
                            "emoji": true
                        },
                        "value": recId,
                        "action_id": Actions.APPROVE
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": `reject ${pfps['peefest']}`,
                            "emoji": true
                        },
                        "value": recId,
                        "action_id": Actions.REJECT
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": `reject & lock ${pfps['ded']}`,
                            "emoji": true
                        },
                        "value": recId,
                        "action_id": Actions.REJECT_LOCK
                    }
                ]
            }, {
            "type": "divider"
            }
        );

        // images break the bot...

        // if (images) {
        //     images.forEach(image => {
        //         blocks.push({
        //             "type": "image",
        //             "image_url": image,
        //             "alt_text": "screenshot"
        //         });
        //     });
        // }

        return blocks;
    }

    public static approved({
        //sessionId: string, minutes: number, createdAt: string, slackId: string | null = null
        sessionId,
        minutes,
        createdAt,
        slackId
    }: {
        sessionId: string,
        minutes: number,
        createdAt: string,
        slackId: string | null
    }) {
        return [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": `${new Date(createdAt).toDateString().toLowerCase()} - ${minutes} minutes ${randomChoice([
                        pfps['woah'],
                        pfps['cute'],
                        pfps['thumbs'],
                        pfps['info']
                    ])}`,
                    "emoji": true
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    // "text": `Approved ${slackId ? `by <@${slackId}>` : ` session!`}`
                    "text": (slackId ? t('review.reviewer.approved', {
                        slackId,
                        minutes: minutes ?? 0
                    }) : t('review.preset.approved', { minutes })) + `
view session: <https://airtable.com/app4kCWulfB02bV8Q/tbl2q5GGdwv252A7q/viwe3w2MTPRpa9uSB/${sessionId}|here>`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": `undo ${pfps['peefest']}`,
                        "emoji": true
                    },
                    "value": sessionId,
                    "action_id": Actions.UNDO
                }
            },
        ]
    }

    public static rejected({
        //sessionId: string, minutes: number, createdAt: string, slackId: string | null = null
        sessionId,
        minutes,
        createdAt,
        slackId
    }: {
        sessionId: string,
        minutes: number,
        createdAt: string,
        slackId: string | null
    }) {
        return [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": `${new Date(createdAt).toDateString().toLowerCase()} - ${minutes} minutes ${randomChoice([
                        pfps['woah'],
                        pfps['cute'],
                        pfps['thumbs'],
                        pfps['info']
                    ])}`,
                    "emoji": true
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    // "text": `Rejected ${slackId ? `by <@${slackId}>` : ` session!`}`
                    "text": slackId ? t('review.reviewer.rejected', { slackId, minutes }) : t('review.preset.rejected', { minutes }) + `
view session: <https://airtable.com/app4kCWulfB02bV8Q/tbl2q5GGdwv252A7q/viwe3w2MTPRpa9uSB/${sessionId}|here>`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": `undo ${pfps['peefest']}`,
                        "emoji": true
                    },
                    "value": sessionId,
                    "action_id": Actions.UNDO
                }
            },
        ]
    }

    public static rejectedLock({
        //sessionId: string, minutes: number, createdAt: string, slackId: string | null = null
        sessionId,
        minutes,
        createdAt,
        slackId
    }: {
        sessionId: string,
        minutes: number,
        createdAt: string,
        slackId: string | null
    }) {
        return [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": `${new Date(createdAt).toDateString().toLowerCase()} - ${minutes} minutes ${randomChoice([
                        pfps['woah'],
                        pfps['cute'],
                        pfps['thumbs'],
                        pfps['info']
                    ])}`,
                    "emoji": true
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    // "text": `Rejected and locked ${slackId ? `by <@${slackId}>` : ` session!`}`
                    "text": slackId ? t('review.reviewer.rejectedlocked', { slackId, minutes }) : t('review.preset.rejectedlocked', { minutes }) + `
<https://airtable.com/app4kCWulfB02bV8Q/tbl2q5GGdwv252A7q/viwe3w2MTPRpa9uSB/${sessionId}|override on airtable>`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": `undo ${pfps['peefest']}`,
                        "emoji": true
                    },
                    "value": sessionId,
                    "action_id": Actions.UNDO
                }
            },
        ]
    }

    public static gimme(): KnownBlock[] {
        return [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "ready for the next review? (CLICK YES ONLY ONCE)"
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": `yes ${pfps['cute']}`,
                            "emoji": true
                        },
                        "action_id": Actions.NEXT_REVIEW
                    }
                ]
            }
        ]
    }
}
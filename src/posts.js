export const posts = [
  {
    slug: 'sql-server-execution-plans',
    title: 'SQL Server execution plans',
    date: 'November 24, 2024',
    topics: ['SQL Server', 'Performance'],
    summary:
      'Estimated vs actual plans, live query stats, and how to pull a historical plan out of the cache.',
    takeaways: [
      'Estimated plans show what SQL Server expects before execution.',
      'Actual plans add runtime evidence, including real row counts.',
      'Previously executed plans may still be available in the plan cache.',
    ],
    content: [
      {
        type: 'p',
        text: 'An execution plan is SQL Server showing its homework: the order of operations it will use (or did use) to retrieve the data. There is a text tree and a graphical one. Both answer the same question — what did the engine actually do?',
      },
      {
        type: 'h2',
        text: 'Text plans',
      },
      {
        type: 'p',
        text: 'SET SHOWPLAN_ALL ON turns on a text-based tree. It lists the logic and the order of operations without running the query as a normal result set. Useful when you want the plan in a form you can copy, grep, or paste into a note.',
      },
      {
        type: 'h2',
        text: 'Graphical plans',
      },
      {
        type: 'comparison',
        items: [
          {
            title: 'Estimated',
            text: 'A prediction built from statistics, indexes, and cardinality estimates before the query runs.',
          },
          {
            title: 'Actual',
            text: 'The plan plus runtime evidence, including real row counts and operator behavior.',
          },
          {
            title: 'Live',
            text: 'A view of the plan filling in while the query is still running.',
          },
        ],
      },
      {
        type: 'h2',
        text: 'Plans you already ran',
      },
      {
        type: 'p',
        text: 'If the query already happened and you did not capture a plan, look in the query plan cache. Cached plans plus the SQL text live in DMVs:',
      },
      {
        type: 'code',
        text: `SELECT *
FROM sys.dm_exec_cached_plans
CROSS APPLY sys.dm_exec_query_plan(plan_handle)
CROSS APPLY sys.dm_exec_sql_text(plan_handle);`,
      },
    ],
  },
  {
    slug: 'tcp-ip-and-the-handshake',
    title: 'TCP/IP and the three-way handshake',
    date: 'November 23, 2024',
    topics: ['Networking', 'TCP/IP'],
    summary:
      'The four layers, why IP does not guarantee delivery, and how TCP makes a connection with SYN, SYN-ACK, ACK.',
    takeaways: [
      'IP delivers packets on a best-effort basis.',
      'TCP adds reliable, in-order delivery on top of IP.',
      'A connection begins with SYN, SYN-ACK, and ACK.',
    ],
    content: [
      {
        type: 'p',
        text: 'The internet is usually described as four layers stacked on top of each other. Each one has a job, and each one is allowed to be a little dishonest about what the layer below it can actually promise.',
      },
      {
        type: 'ul',
        items: [
          'Application — HTTP, SMTP, FTP',
          'Transport — TCP, UDP',
          'Internet — IP, ICMP',
          'Link — Ethernet, Wi-Fi, Bluetooth',
        ],
      },
      {
        type: 'h2',
        text: 'IP does not guarantee arrival',
      },
      {
        type: 'p',
        text: 'When a program sends data over IP, the data is broken into packets. Each packet has a header and a payload. The header has a source and a destination, like an envelope. The important similarity with the postal service is the same one people forget: packets are not guaranteed to arrive. Effort is made. Some still get lost.',
      },
      {
        type: 'p',
        text: 'If you send five packets at once, they may not arrive together, and they may not arrive in order.',
      },
      {
        type: 'h2',
        text: 'What TCP adds',
      },
      {
        type: 'p',
        text: 'TCP is a reliable protocol that runs on top of unreliable IP. Primarily it offers two guarantees: reliable delivery of packets, and in-order delivery of packets.',
      },
      {
        type: 'p',
        text: 'TCP can carry real-time video, but UDP is the more common choice there because it is faster. For a live stream it is often better to drop a few packets than to deliver every packet late.',
      },
      {
        type: 'h2',
        text: 'The handshake',
      },
      {
        type: 'p',
        text: 'Clients and servers establish a TCP connection in three steps.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'SYN',
            text: 'The client asks to connect and sends its initial sequence number.',
          },
          {
            title: 'SYN-ACK',
            text: 'The server acknowledges the request and sends its own sequence number.',
          },
          {
            title: 'ACK',
            text: 'The client acknowledges the server. The connection is now established.',
          },
        ],
      },
    ],
  },
]

export function getPost(slug) {
  return posts.find((post) => post.slug === slug)
}

export function getReadingTime(post) {
  const words = [
    post.summary,
    ...post.content.flatMap((block) => {
      if (block.text) return [block.text]
      return (block.items ?? []).flatMap((item) =>
        typeof item === 'string' ? [item] : [item.title, item.text],
      )
    }),
  ]
    .join(' ')
    .trim()
    .split(/\s+/).length

  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

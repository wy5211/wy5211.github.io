#!/usr/bin/env python3
"""MDX 格式批量预检脚本。

检查项：
1. summary 字段嵌套引号（会导致 YAML 解析失败）
2. JSX 标签陷阱：< 后跟非字母（会被解析为 JSX 标签导致编译失败）
3. 禁用词扫描（AI 腔、空话开场、凑数过渡等）

用法：
  python3 scripts/check-mdx.py content/posts/valuation/
  python3 scripts/check-mdx.py content/posts/valuation/ content/posts/etf-guide/
"""

import re, sys, os

# 禁用词正则（匹配正文，跳过 frontmatter）
FORBIDDEN_WORDS = [
    r'在当今',
    r'随着.{0,10}的发展',
    r'众所周知',
    r'不可否认',
    r'值得一提',
    r'综上所述',
    r'总而言之',
    r'不难看出',
    r'希望对你有帮助',
    r'让我们一起加油',
    r'未来可期',
    r'具体情况具体分析',
    r'适合自己的才是最好的',
]

def extract_body(content):
    """提取 frontmatter 之后的部分。"""
    end = content.find('---', content.find('---') + 3)
    if end < 0:
        return content
    return content[end + 3:]

def check_file(filepath):
    """检查单个 .mdx 文件，返回问题列表。"""
    issues = []
    filename = os.path.basename(filepath)
    content = open(filepath, encoding='utf-8').read()

    # 1. summary 嵌套引号
    summary_match = re.search(r'summary:\s*"([^"]*)"', content)
    if summary_match:
        val = summary_match.group(1)
        if '\\"' in val or (val.count('"') > 0 and '\\' in val):
            issues.append(f"[summary] {filename}: summary 可能含嵌套引号: {val[:60]}...")

    # 2. JSX 标签陷阱（正文部分，跳过代码块内部）
    body = extract_body(content)
    in_code_block = False
    for i, line in enumerate(body.split('\n'), 1):
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            continue
        if in_code_block:
            continue
        if line.strip().startswith('|'):
            continue
        matches = re.findall(r'<[^a-zA-Z/!=]', line)
        if matches:
            issues.append(f"[jsx] {filename} body ~L{i}: `<` 后跟非字母: {line.strip()[:80]}")

    # 3. 禁用词
    for word in FORBIDDEN_WORDS:
        for m in re.finditer(word, body):
            line_num = body[:m.start()].count('\n') + 1
            line_text = body.split('\n')[line_num - 1].strip()[:60]
            issues.append(f"[禁用词] {filename} ~L{line_num}: '{word}' in: {line_text}")

    return issues

def main():
    if not sys.argv[1:]:
        print("用法: python3 scripts/check-mdx.py <dir1> [dir2] ...")
        sys.exit(1)

    all_issues = []
    total_files = 0

    for directory in sys.argv[1:]:
        if not os.path.isdir(directory):
            print(f"⚠️ 目录不存在: {directory}")
            continue
        for f in sorted(os.listdir(directory)):
            if not f.endswith('.mdx'):
                continue
            fpath = os.path.join(directory, f)
            file_issues = check_file(fpath)
            total_files += 1
            if file_issues:
                all_issues.extend(file_issues)

    if all_issues:
        print(f"❌ 检查 {total_files} 个文件，发现 {len(all_issues)} 个问题：")
        for issue in all_issues:
            print(f"  {issue}")
        sys.exit(1)
    else:
        print(f"✅ {total_files} 个 MDX 文件全部通过检查")
        sys.exit(0)

if __name__ == '__main__':
    main()

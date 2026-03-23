import TechStackCard from "./TechStackCard";
import { TechStack } from "@/lib/tech-stacks";

interface TechStackGridProps {
  techStacks: Array<TechStack & { postCount: number }>;
}

export default function TechStackGrid({ techStacks }: TechStackGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
      {techStacks.map((stack, index) => (
        <div
          key={stack.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <TechStackCard stack={stack} />
        </div>
      ))}
    </div>
  );
}

import { motion } from 'framer-motion';

interface Step {
  label: string;
  status: 'done' | 'running' | 'waiting';
  color: string;
}

const steps: Step[] = [
  { label: 'Build', status: 'done', color: 'text-green-400' },
  { label: 'Test', status: 'done', color: 'text-green-400' },
  { label: 'Deploy', status: 'running', color: 'text-indigo-400' },
  { label: 'Live', status: 'waiting', color: 'text-white/30' },
];

function StatusIcon({ status }: { status: Step['status'] }) {
  if (status === 'done') {
    return (
      <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  if (status === 'running') {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-3 h-3 border border-indigo-400 border-t-transparent rounded-full"
      />
    );
  }
  return <div className="w-3 h-3 rounded-full border border-white/20" />;
}

export default function DeployStatus() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl glass-card border border-white/8 max-w-full overflow-x-auto">
      <div className="flex items-center gap-1.5">
        <motion.div
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-2 h-2 bg-indigo-400 rounded-full"
        />
        <span className="text-xs font-mono text-white/40">CI/CD</span>
      </div>
      <div className="w-px h-4 bg-white/10" />
      <div className="flex items-center gap-3">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1.5">
            <StatusIcon status={step.status} />
            <span className={`text-xs font-mono ${step.color}`}>{step.label}</span>
            {i < steps.length - 1 && (
              <motion.div
                animate={step.status === 'done' ? { scaleX: 1, opacity: 1 } : { scaleX: 0.3, opacity: 0.3 }}
                className="w-4 h-px bg-gradient-to-r from-indigo-500/40 to-white/10 origin-left"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

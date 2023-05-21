const COLOR = {
  ok: "bg-green-500 text-primary",
  warning: "bg-yellow-400 text-primary",
  danger: "bg-orange-400 text-primary",
  fatal: "bg-red-700 text-white",
} as const;

interface BulbProps {
  status: keyof typeof COLOR;
  value: string;
}

const Bulb: React.FC<BulbProps> = ({ status, value }) => {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm ${COLOR[status]}`}
    >
      {value}
    </div>
  );
};

export default Bulb;

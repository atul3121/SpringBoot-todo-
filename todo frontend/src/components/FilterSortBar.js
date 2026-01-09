export default function FilterSortBar({ setFilter }) {
  return (
    <div>
      <select onChange={e => setFilter({ priority: e.target.value })}>
        <option value="">All Priority</option>
        <option>URGENT</option>
        <option>NORMAL</option>
        <option>LOW</option>
      </select>

      <select onChange={e => setFilter({ status: e.target.value })}>
        <option value="">All Status</option>
        <option>DONE</option>
        <option>IN_PROGRESS</option>
        <option>NOT_STARTED</option>
      </select>
    </div>
  );
}

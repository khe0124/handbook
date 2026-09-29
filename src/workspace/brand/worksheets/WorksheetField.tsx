import type { Answer, WorksheetField as Field } from "./types";

export function WorksheetField({ field, value, onChange }: {field: Field; value: Answer; onChange: (value: Answer) => void}) {
  const id = `answer-${field.id}`;
  const hintId = field.hint ? `${id}-hint` : undefined;
  const hint = field.hint && <p id={hintId} className="brand-muted worksheet-hint">{field.hint}</p>;
  if (field.type === "choices") {
    const selected = value as string[];
    return <fieldset className="worksheet-field" aria-describedby={hintId}>
      <legend>{field.label}</legend>{hint}
      <div className="worksheet-choices">{field.options!.map((option,index) => <label key={option} htmlFor={`${id}-${index}`}><input id={`${id}-${index}`} type="checkbox" checked={selected.includes(option)} onChange={event => onChange(event.target.checked ? [...selected,option] : selected.filter(item=>item!==option))} /><span>{option}</span></label>)}</div>
    </fieldset>;
  }
  if (field.type === "list") {
    const values = value as string[];
    return <fieldset className="worksheet-field" aria-describedby={hintId}>
      <legend>{field.label}</legend>{hint}
      <ol className="worksheet-list">{Array.from({length:field.count!},(_,index)=><li key={index}><label className="worksheet-sr-only" htmlFor={`${id}-${index}`}>{field.label} {index+1}번</label><input id={`${id}-${index}`} type="text" value={values[index] || ""} onChange={event=>onChange(values.map((item,position)=>position===index ? event.target.value : item))} /></li>)}</ol>
    </fieldset>;
  }
  if (field.type === "scale") {
    return <fieldset className="worksheet-field worksheet-scale">
      <legend>{field.label}</legend>
      <div className="worksheet-scale-ends"><span>1 · {field.left}</span><span>5 · {field.right}</span></div>
      <div className="worksheet-scale-options">{[1,2,3,4,5].map(number=><label key={number}><input type="radio" name={id} value={number} checked={value===String(number)} onChange={()=>onChange(String(number))} aria-label={`${number}${number===1 ? ` · ${field.left}` : number===5 ? ` · ${field.right}` : ""}`} /><span>{number}</span></label>)}</div>
      <button type="button" className="worksheet-clear-scale" onClick={()=>onChange("")} disabled={!value}>선택 해제</button>
    </fieldset>;
  }
  return <div className="worksheet-field">
    <label htmlFor={id}>{field.label}</label>{hint}
    {field.type === "text" ? <input id={id} type={field.inputType || "text"} value={value as string} aria-describedby={hintId} onChange={event=>onChange(event.target.value)} /> :
      <textarea id={id} rows={3} value={value as string} aria-describedby={hintId} onChange={event=>onChange(event.target.value)} />}
  </div>;
}

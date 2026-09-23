Tabs, hairline underline tabs (or pills for filters); roving tabindex, arrow-key navigation.

```jsx
<Tabs id="ev" tabs={[{value:"up",label:"Upcoming",count:3,content:<EventList/>},{value:"past",label:"Past",content:<Past/>}]} />
<Tabs variant="pills" tabs={[{value:"all",label:"All"},{value:"poems",label:"Poems"},{value:"essays",label:"Essays"}]} onChange={setFilter} />
```

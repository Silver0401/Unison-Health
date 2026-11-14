// Ejecutar en /agendar con: agent-browser eval --stdin < scripts/check-booking-browser.js
(async () => {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const until = async (check) => {
    const deadline = Date.now() + 3000;
    while (!check()) {
      if (Date.now() > deadline) throw new Error('El paso no cambió a tiempo');
      await new Promise(resolve => setTimeout(resolve, 30));
    }
  };
  const active = () => document.querySelector('.booking-panels[data-active="true"]');
  const choose = (name) => active().querySelector(`[aria-label="${name}"]`);
  location.hash = 'consulta';
  await until(() => !active()?.classList.contains('is-followup'));
  assert(document.querySelector('header.top'), 'Falta la navegación');
  assert(active().querySelectorAll('.booking-panel').length === 2, 'Deben existir dos opciones');
  assert(document.querySelector('.booking-panels[aria-hidden="true"]').hasAttribute('inert'), 'El paso oculto debe ser inerte');
  choose('Agendar consulta inicial').click();
  assert(document.querySelector('dialog').open, 'La URL pendiente debe abrir un aviso');
  document.querySelector('dialog').close();
  choose('Agendar consulta de seguimiento').click();
  await until(() => active()?.classList.contains('is-followup'));
  assert(document.activeElement.id === 'booking-heading', 'El foco debe llegar al nuevo encabezado');
  const titles = [...active().querySelectorAll('h2')].map(node => node.textContent);
  assert(titles[0].includes('Diana') && titles[1].includes('Ismael'), 'Orden incorrecto de profesionales');
  for (const name of ['Agendar con la Lic. Diana', 'Agendar con el Dr. Ismael']) {
    choose(name).click();
    assert(document.querySelector('dialog').open, `Falta aviso para ${name}`);
    await until(() => document.querySelector('dialog .booking-eyebrow').textContent === name);
    document.querySelector('dialog').close();
  }
  document.querySelector('.booking-back').click();
  await until(() => !active()?.classList.contains('is-followup'));
  assert(document.documentElement.scrollWidth <= innerWidth, 'Hay desbordamiento horizontal');
  assert([...document.querySelectorAll('header nav a')].every(link => link.getAttribute('href').startsWith('/#')), 'La navegación debe volver a secciones de inicio');
  return 'OK: selección, tres agendas pendientes, profesionales, regreso, foco, paso oculto, navegación y ancho';
})();

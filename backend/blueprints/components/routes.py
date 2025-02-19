from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required
from backend.models.models import (Component, ComponentType, Size, Status, Model, RiggingType,
                           rig_component_association, Rigging, Manufacturer, Rig)
from backend.extensions import db
from backend.utilities import mount_component_logic, umount_component_logic

components_bp = Blueprint('components', __name__)

@components_bp.route('/components')
@components_bp.route('/components/<component_type>')
def view_components(component_type=None):
    component_types = ComponentType.query.all()
    component_sizes = Size.query.all()
    component_statuses = Status.query.all()
    component_models = Model.query.all()
    type_rigging = RiggingType.query.all()

    is_aad = False
    if component_type:
        component_type = component_type.capitalize()
        components = Component.query.join(ComponentType).filter(ComponentType.component_type == component_type).all()
        title = f"{component_type}"
        if component_type == "Aad":
            is_aad = True
    else:
        components = Component.query.all()
        title = "Todos los Componentes"

    return render_template('components/view_components.html', components=components, title=title, is_aad=is_aad,
                           component_types=component_types, component_sizes=component_sizes,
                           component_statuses=component_statuses, component_models=component_models,
                           type_rigging=type_rigging)

@components_bp.route('/component/show/<int:component_id>')
@login_required
def show_component(component_id):
    component = Component.query.get_or_404(component_id)
    component_types = ComponentType.query.all()
    component_sizes = Size.query.all()
    component_statuses = Status.query.all()
    component_models = Model.query.all()
    type_rigging = RiggingType.query.all()
    riggings = Rigging.query.filter_by(component_id=component.id).order_by(Rigging.date.desc()).all()

    available_rigs = Rig.query.all()

    if component.component_type.component_type == 'Canopy':
        available_rigs = [rig for rig in available_rigs if
                          not any(c.component_type.component_type == 'Canopy' for c in rig.components)]
    elif component.component_type.component_type == 'Container':
        available_rigs = [rig for rig in available_rigs if
                          not any(c.component_type.component_type == 'Container' for c in rig.components)]
    elif component.component_type.component_type == 'Reserve':
        available_rigs = [rig for rig in available_rigs if
                          not any(c.component_type.component_type == 'Reserve' for c in rig.components)]
    elif component.component_type.component_type == 'Aad':
        available_rigs = [rig for rig in available_rigs if
                          not any(c.component_type.component_type == 'Aad' for c in rig.components)]

    return render_template('components/show_component.html', component=component, riggings=riggings,
                           component_types=component_types, component_sizes=component_sizes,
                           available_rigs=available_rigs,component_statuses=component_statuses,
                           component_models=component_models)

@components_bp.route('/component/add', methods=['GET', 'POST'])
def add_component():
    message = None
    if request.method == 'POST':
        new_component = Component(
            component_type_id=request.form['component_type_id'],
            serial_number=request.form['serial_number'],
            dom=request.form.get('dom', None),
            size_id=request.form.get('size_id', None),
            status_id=request.form.get('status_id', None),
            model_id=request.form.get('model_id', None)
        )

        rig_id = request.form.get('rig_id')
        if rig_id:
            rig = Rig.query.get(rig_id)
            if rig:
                new_component.rig_id = rig.id

        db.session.add(new_component)
        db.session.commit()
        return redirect(url_for('components.view_components'))

    component_types = ComponentType.query.filter(ComponentType.component_type != 'Rig').all()
    component_sizes = Size.query.all()
    component_statuses = Status.query.all()
    component_models = Model.query.all()
    return render_template('components/add_component.html',
                           component_types=component_types,
                           component_sizes=component_sizes,
                           component_statuses=component_statuses,
                           component_models=component_models)

@components_bp.route('/component/edit/<int:id>', methods=['GET', 'POST'])
def edit_component(id):
    component = Component.query.get_or_404(id)
    component_types = ComponentType.query.all()
    component_sizes = Size.query.all()
    component_statuses = Status.query.all()
    component_models = Model.query.all()

    if request.method == 'POST':
        component.component_type_id = request.form['component_type_id']
        component.serial_number = request.form['serial_number']
        component.dom = request.form.get('dom', None)
        component.size_id = request.form.get('size_id', None)
        component.status_id = request.form.get('status_id', None)
        component.model_id = request.form.get('model_id', None)
        component_type = component.component_type.component_type

        db.session.commit()
        return redirect(url_for('components.view_components', component_type=component_type))

    return render_template('templates/edit_component.html',
                           component=component,
                           component_types=component_types,
                           component_sizes=component_sizes,
                           component_statuses=component_statuses,
                           component_models=component_models)

@components_bp.route('/component/delete/<int:id>', methods=['POST'])
def delete_component(id):
    component = Component.query.get_or_404(id)
    db.session.delete(component)
    db.session.commit()
    return redirect(url_for('components.view_components'))


@components_bp.route('/component/umount/<int:component_id>', methods=['POST'])
def umount_component(component_id):
    current_aad_jumps = request.form.get('current_aad_jumps', type=int)
    try:
        umount_component_logic(component_id, current_aad_jumps)
        flash('Component successfully unmounted', 'success')
    except ValueError as e:
        flash(str(e), 'danger')
    umount_component_logic(component_id, current_aad_jumps)
    return redirect(url_for('components.view_components'))



@components_bp.route('/component/mount/<int:component_id>', methods=['POST'])
def mount_component(component_id):
    rig_id = request.form.get('rig_id', type=int)
    current_aad_jumps = request.form.get('current_aad_jumps', type=int)
    mount_component_logic(component_id, rig_id, current_aad_jumps)
    return redirect(url_for('components.view_components'))

